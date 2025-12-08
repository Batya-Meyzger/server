"use strict";
//   const handleError = (res: Response, error: unknown) => {
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     // טיפול ספציפי בשגיאות 404 שה-Service זורק
//     if (errorMessage.includes('not found') || errorMessage.includes('Cart is empty')) {
//         return res.status(404).json({ error: errorMessage });
//     }
//     // טיפול בשגיאות ID לא תקין (אם כי עדיף לשים במידלוור)
//     if (errorMessage.includes('Cast to ObjectId failed')) {
//         return res.status(400).json({ error: 'Invalid ID format.' });
//     }
//     return res.status(500).json({ error: 'Internal Server Error: ' + errorMessage });
// };
// export default handleError ;
