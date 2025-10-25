const conf = {
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteendpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectName: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwritedatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwritebucketId: String(import.meta.env.VITE_BUCKET_ID),
    appwitecollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    googleSuccessRedirect: String(import.meta.env.VITE_SUCCESS_REDIRECT),
    googleFailureRedirect: String(import.meta.env.VITE_FAILURE_REDIRECT)

}

export { conf }