const authHeader = () => {
  const token = localStorage.getItem('token')

  return (token
    ? { 'x-access-token': token }
    : {}
  )
}

export default authHeader
