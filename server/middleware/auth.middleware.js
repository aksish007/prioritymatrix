const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('No Bearer token found in header');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    console.log('Token extracted:', token ? 'Token present' : 'No token');
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Token verified successfully for user:', decodedToken.uid);
    
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email
    };
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ 
      message: 'Invalid token',
      error: error.message 
    });
  }
};

module.exports = verifyToken;
