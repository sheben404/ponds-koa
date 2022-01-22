import jwt from 'jsonwebtoken'

const SECRET_KEY = 'pondsTokenSecretKey'
const EXPIRS_TIME = 60 * 60 * 24 // 24h

interface TokenData {
  userId: number
}

interface DecodeToken {
  data: TokenData
}

export const genToken = (data: TokenData) => {
  return jwt.sign({ data }, SECRET_KEY, { expiresIn: EXPIRS_TIME })
}

export const decodeToken: (Authorization) => DecodeToken = Authorization => {
  try {
    // Authorization 格式为 Bearer <token>
    const token = Authorization.split(' ')[1]
    return jwt.verify(token, SECRET_KEY)
  } catch (e) {
    return 'token 失效'
  }
}
// // 测试函数（把 EXPIRS_TIME 改为 1）
// // 运行 pnpm ts-node-dev ./app/helpers/jwt.ts
// const token = genToken({ id: 1 })
// console.log('token', token)
// console.log(decodeToken(token))
// setTimeout(() => {
//   console.log(decodeToken(token))
// }, 1000 * 61)