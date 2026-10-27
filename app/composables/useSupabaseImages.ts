export const useSupabaseImages=()=>{
    
    const getImageUrl=(filePath:string='',bucketName:string='Photos')=>{
        // a full URL is used as is, anything else is a path in the bucket
        if (/^https?:\/\//i.test(filePath)) return filePath
        const config = useRuntimeConfig()
        const projectUrl = config.public.supabaseUrl
        return `${projectUrl}/storage/v1/object/public/${bucketName}/${filePath}`
    }

    return {getImageUrl}
}