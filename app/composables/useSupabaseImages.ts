export const useSupabaseImages=()=>{
    
    const getImageUrl=(filePath:string='',bucketName:string='Photos')=>{
        const config = useRuntimeConfig()
        const projectUrl = config.public.supabaseUrl
        return `${projectUrl}/storage/v1/object/public/${bucketName}/${filePath}`
    }

    return {getImageUrl}
}