import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a browser File to Firebase Storage and return its public download URL
 */
export async function uploadImageFile(file: File, folder = "uploads"): Promise<string> {
  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanName}`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);

    const metadata = {
      contentType: file.type || 'image/jpeg',
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Firebase Storage file upload error:", error);
    throw error;
  }
}

/**
 * Upload a Base64 / DataURL image to Firebase Storage and return its public download URL
 */
export async function uploadDataUrl(dataUrl: string, folder = "uploads"): Promise<string> {
  // If it's already an HTTP / HTTPS URL, no need to re-upload
  if (dataUrl.startsWith("http://") || dataUrl.startsWith("https://")) {
    return dataUrl;
  }

  try {
    const uniqueFileName = `${Date.now()}_img_${Math.random().toString(36).substring(2, 8)}.jpg`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);

    await uploadString(storageRef, dataUrl, "data_url");
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Firebase Storage DataURL upload error:", error);
    // If upload fails (e.g. storage rules), return dataUrl so UI doesn't break
    return dataUrl;
  }
}
