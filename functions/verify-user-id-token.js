const admin = require("firebase-admin")

const handler = async event => {
  try {
    if (!admin.apps.length) {
      await admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.GATSBY_FB_ADMIN_ID,
          privateKey:
            process.env.GATSBY_FB_ADMIN_KEY[0] === "-"
              ? process.env.GATSBY_FB_ADMIN_KEY
              : JSON.parse(process.env.GATSBY_FB_ADMIN_KEY),
          clientEmail: process.env.GATSBY_FB_ADMIN_EMAIL,
        }),
      })
    }

    const { userIdToken } = JSON.parse(event.body)
    await admin.auth().verifyIdToken(userIdToken)
    console.log("verified id token")
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "token verified!" }),
    }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
