const hostResolver = () => `${(process.env.NODE_ENV === 'production' ? 'https' : 'http')}://${process.env.API}`

export default hostResolver
