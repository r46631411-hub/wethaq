import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createDocument, getUserDocuments, getDocumentById, updateDocumentStatus, createSignature, getDocumentSignatures, createSealedDocument, getSealedDocumentByDocumentId } from "../db";
import { storagePut, storageGet } from "../storage";
import crypto from "crypto";

export const documentsRouter = router({
  // رفع مستند جديد
  uploadDocument: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileData: z.string(), // Base64 encoded
        mimeType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // تحويل Base64 إلى Buffer
        const buffer = Buffer.from(input.fileData, "base64");
        const fileSize = buffer.length;

        // إنشاء مفتاح فريد للملف
        const fileKey = `documents/${ctx.user.id}/${Date.now()}-${input.fileName}`;

        // رفع الملف إلى S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // حفظ معلومات المستند في قاعدة البيانات
        await createDocument(ctx.user.id, {
          fileName: input.fileName,
          fileKey,
          fileUrl: url,
          mimeType: input.mimeType,
          fileSize,
          status: "uploaded",
        });

        return {
          success: true,
          documentId: Math.floor(Math.random() * 10000),
          fileUrl: url,
        };
      } catch (error) {
        console.error("Error uploading document:", error);
        throw new Error("فشل في رفع المستند");
      }
    }),

  // الحصول على مستندات المستخدم
  getUserDocuments: protectedProcedure.query(async ({ ctx }) => {
    try {
      const docs = await getUserDocuments(ctx.user.id);
      return docs;
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  }),

  // الحصول على تفاصيل مستند معين
  getDocument: protectedProcedure
    .input(z.object({ documentId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const doc = await getDocumentById(input.documentId);
        
        // التحقق من أن المستند يخص المستخدم الحالي
        if (doc && doc.userId !== ctx.user.id) {
          throw new Error("غير مصرح بالوصول لهذا المستند");
        }

        return doc;
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
    }),

  // حفظ التوقيع
  saveSignature: protectedProcedure
    .input(
      z.object({
        documentId: z.number(),
        signatureImageData: z.string(), // Base64 encoded
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // التحقق من أن المستند يخص المستخدم
        const doc = await getDocumentById(input.documentId);
        if (!doc || doc.userId !== ctx.user.id) {
          throw new Error("غير مصرح بالتوقيع على هذا المستند");
        }

        // تحويل Base64 إلى Buffer
        const buffer = Buffer.from(input.signatureImageData, "base64");

        // إنشاء بصمة التوقيع
        const signatureHash = crypto
          .createHash("sha256")
          .update(buffer)
          .digest("hex");

        // رفع صورة التوقيع إلى S3
        const signatureKey = `signatures/${ctx.user.id}/${input.documentId}-${Date.now()}.png`;
        const { url: signatureUrl } = await storagePut(
          signatureKey,
          buffer,
          "image/png"
        );

        // حفظ بيانات التوقيع في قاعدة البيانات
        await createSignature({
          documentId: input.documentId,
          userId: ctx.user.id,
          signatureImageKey: signatureKey,
          signatureImageUrl: signatureUrl,
          signatureHash,
        });

        // تحديث حالة المستند إلى "موقع"
        await updateDocumentStatus(input.documentId, "signed");

        return {
          success: true,
          signatureId: Math.floor(Math.random() * 10000),
          signatureUrl,
        };
      } catch (error) {
        console.error("Error saving signature:", error);
        throw new Error("فشل في حفظ التوقيع");
      }
    }),

  // الحصول على توقيعات المستند
  getDocumentSignatures: protectedProcedure
    .input(z.object({ documentId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const doc = await getDocumentById(input.documentId);
        if (doc && doc.userId !== ctx.user.id) {
          throw new Error("غير مصرح بالوصول لهذا المستند");
        }

        return await getDocumentSignatures(input.documentId);
      } catch (error) {
        console.error("Error fetching signatures:", error);
        return [];
      }
    }),

  // ختم المستند
  sealDocument: protectedProcedure
    .input(
      z.object({
        documentId: z.number(),
        signatureId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // التحقق من أن المستند يخص المستخدم
        const doc = await getDocumentById(input.documentId);
        if (!doc || doc.userId !== ctx.user.id) {
          throw new Error("غير مصرح بختم هذا المستند");
        }

        // إنشاء بصمة الختم
        const sealHash = crypto
          .createHash("sha256")
          .update(`${input.documentId}-${input.signatureId}-${Date.now()}`)
          .digest("hex");

        // في الواقع، يجب دمج التوقيع مع المستند الأصلي
        // لكن للآن سنحفظ المرجع فقط
        const sealedDocumentKey = `sealed-documents/${ctx.user.id}/${input.documentId}-${Date.now()}.pdf`;
        const sealedDocumentUrl = doc.fileUrl; // في الواقع يجب دمج التوقيع

        // حفظ بيانات المستند الموثق
        await createSealedDocument({
          documentId: input.documentId,
          signatureId: input.signatureId,
          sealedDocumentKey,
          sealedDocumentUrl,
          sealHash,
        });

        // تحديث حالة المستند إلى "موثق"
        await updateDocumentStatus(input.documentId, "sealed");

        return {
          success: true,
          sealedDocumentId: Math.floor(Math.random() * 10000),
          sealedDocumentUrl,
          sealHash,
        };
      } catch (error) {
        console.error("Error sealing document:", error);
        throw new Error("فشل في ختم المستند");
      }
    }),

  // الحصول على المستند الموثق
  getSealedDocument: protectedProcedure
    .input(z.object({ documentId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const doc = await getDocumentById(input.documentId);
        if (doc && doc.userId !== ctx.user.id) {
          throw new Error("غير مصرح بالوصول لهذا المستند");
        }

        return await getSealedDocumentByDocumentId(input.documentId);
      } catch (error) {
        console.error("Error fetching sealed document:", error);
        return null;
      }
    }),
});
