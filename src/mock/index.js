export default [
    {
        url: '/users/login',
        method: 'post',
        response: () => {
            return {
                code: 0,
                message: 'success',
                data: {
                    username: 'Zhao',
                    roles: ['admin']
                }
            }
        }
    }
]
