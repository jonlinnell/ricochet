const hostResolver = () => `${(process.env.NODE_ENV === 'production' ? 'https' : 'http')}://${process.env.HOST}:${process.env.PORT}`

export default hostResolver
