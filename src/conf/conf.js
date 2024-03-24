const conf = {
	appwriteUrl: String(import.env.VITE_APPWRITE_URL),
	appwriteProjectId: String(VITE_APPRWRITE_PROJECT_ID),
	appwriteDatabaseId: String(VITE_APPWRITE_DATABASE_ID),
	appwriteCollectionId: String(VITE_APPWRITE_COLLECTION_ID),
	appwriteBucketId: String(VITE_APPWRITE_BUCKET_ID),
};

export default conf;