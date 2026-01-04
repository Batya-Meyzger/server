import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Submissions, setSubmissions] = React.useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null); // שומר את ההגשה שנבחרה לציון
  const [gradeInput, setGradeInput] = useState(''); // שומר את הציון שהוקלד
  const [feedbackInput, setFeedbackInput] = useState(''); // שומר את המשוב שהוקלד

  // בדיקה אם המשתמש כבר מחובר
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded);
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://127.0.0.1:3000/identify/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        setUser(decoded);
        alert(data.message);
      } else {
        alert(data.message || "שגיאה בהתחברות");
      }
    } catch (err) {
      alert("שגיאת תקשורת עם השרת");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setSubmissions([]); // איפוס נתונים ביציאה
  };

  const handleAction = async (endpoint, method = 'GET', body = null) => {
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
      if (body) options.body = JSON.stringify(body);

      const response = await fetch(`http://127.0.0.1:3000${endpoint}`, options);
      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        if (Array.isArray(data)) {
          setSubmissions(data);
        } else if (data.submissions) {
          setSubmissions(data.submissions);
        }
      } else {
        alert(data.message || "שגיאה בביצוע הפעולה");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("שגיאת תקשורת עם השרת");
    }
  };

  const handleCreateWithPrompts = async () => {
    const title = prompt("הזינו את שם המטלה:");
    if (!title) return;
    const description = prompt("הזינו תיאור למטלה:");
    if (!description) return;
    const dueDate = prompt("הזינו תאריך הגשה (YYYY-MM-DD):", "2026-01-30");
    if (!dueDate) return;

    await handleAction('/teacher', 'POST', { title, description, dueDate });
    alert("מטלה נוצרה בהצלחה!");
  };

  if (!user) {
    return (
      <div dir="rtl" style={styles.container}>
        <form onSubmit={handleLogin} style={styles.card}>
          <h2>כניסה למערכת</h2>
          <input name="email" type="email" placeholder="אימייל" style={styles.input} required />
          <input name="password" type="password" placeholder="סיסמה" style={styles.input} required />
          <button type="submit" disabled={loading} style={styles.loginBtn}>
            {loading ? 'מתחבר...' : 'כניסה'}
          </button>
        </form>
      </div>
    );
  }
  const submitGrade = async () => {
    if (!selectedSubmission) {
    console.log("No submission selected");
    return;
  }
  await handleAction(
    `/teacher/student/${selectedSubmission.studentId}/assignment/${selectedSubmission.assignmentId._id}`,
    'PUT',
    { grade: Number(gradeInput), feedback: feedbackInput }
  );

  // סגירת החלונית ואיפוס שדות
  setSelectedSubmission(null);
  setGradeInput('');
  setFeedbackInput('');
};


  return (
    
    <div dir="rtl" style={styles.container}>
      <header style={styles.header}>
        <span>מחובר כ: {user.role === 'teacher' ? 'מורה' : 'תלמידה'}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>התנתק</button>
      </header>
      

      <main style={styles.mainContent}>
        <div style={styles.grid}>
          {user.role === 'teacher' ? (
            <>
              <h3>ממשק ניהול מורה</h3>
              <button style={styles.btn} onClick={handleCreateWithPrompts}>➕ יצירת מטלה</button>
              <button style={styles.btn} onClick={() => handleAction('/teacher/all', 'GET')}>📂 כל ההגשות</button>
              <div style={styles.submissionsSection}>
              <h3 style={styles.subTitle}>רשימת הגשות לבדיקה:</h3>  
              {Submissions.length === 0 ? (
               <p>אין נתונים להצגה. לחצי על "צפייה בכל ההגשות" כדי לטעון נתונים.</p>
              ) : (
              <div style={styles.listContainer}>
              {Submissions.map((item, index) => (
              <div key={item._id || index} style={styles.itemCard}>
              <p><strong>מטלה:</strong> {item.assignmentId?.title || "ללא שם"}</p>
              <p><strong>קוד תלמידה:</strong> {item.studentId}</p>
              <p><strong>ציון נוכחי:</strong> {item.grade || "טרם ניתן"}</p> 
              <button style={{...styles.btn, backgroundColor: '#4a90e2', color: 'white', marginTop: '10px',cursor: 'pointer', zIndex: 10}} 
              onClick={() => { setSelectedSubmission(item);}}>  💯 מתן ציון ומשוב  </button>
        </div>
      ))}
    </div>
  )}
</div>
              <button style={styles.btn} onClick={() => handleAction('/teacher/students-avg', 'GET')}>📊 ממוצעים</button>
            </>
          ) : (
            <>
              <h3>ממשק למידה - תלמידה</h3>
              <button style={styles.btn} onClick={() => handleAction('/student/all', 'GET')}>📖 תרגילים פתוחים</button>
              <button style={styles.btn} onClick={() => handleAction('/student', 'POST', {
                assignmentId: prompt("הזן את מזהה המטלה להגשה:"),
                studentId: prompt("הזן את קוד התלמיד/ה שלך:"),
                githubLink: prompt("הזן את קישור הגיטהאב שלך:"),
                partners: prompt("הזן את שמות השותפים (במקרה של שיתוף):").split(',').map(s => s.trim())

              })}>🚀 הגשת מטלה</button>
              <button style={styles.btn} onClick={() => handleAction('/student/me', 'GET')}>📑 ההגשות שלי</button>
            </>
          )}
        </div>

        {/* תצוגת הרשימה - תופיע רק אם יש נתונים או אם התבקשה צפייה */}
        <div style={styles.submissionsSection}>
          <h3 style={styles.subTitle}>רשימת נתונים מהשרת:</h3>
          {Submissions.length === 0 ? (
            <p>אין נתונים להצגה כרגע (לחצי על אחד הכפתורים למעלה)</p>
          ) : (
            <div style={styles.listContainer}>
              {Submissions.map((item, index) => (
                <div key={item._id || index} style={styles.itemCard}>
                  <p><strong>מטלה:</strong> {item.assignmentId?.title || "כללי"}</p>
                  <p><strong>קוד/שם:</strong> {item.studentId || item.title}</p>
                  {item.githubLink && <p><strong>גיטהאב:</strong> {item.githubLink}</p>}
                  {item.grade !== undefined && <p><strong>ציון:</strong> {item.grade}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* חלונית מתן ציון - תופיע רק כש-selectedSubmission אינו null */}
{selectedSubmission && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalContent}>
      <h3 style={{ borderBottom: '2px solid #4a90e2', paddingBottom: '4px' }}>
        מתן ציון למטלה: {selectedSubmission.assignmentId?.title || "כללי"}
      </h3>
      <p><strong>תלמידה:</strong> {selectedSubmission.studentId}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '15px' }}>
        <label>ציון:</label>
        <input 
          type="number" 
          value={gradeInput}
          onChange={(e) => setGradeInput(e.target.value)}
          placeholder="הזינו מספר (0-100)"
          style={styles.input}
        />
        
        <label>משוב:</label>
        <textarea 
          value={feedbackInput}
          onChange={(e) => setFeedbackInput(e.target.value)}
          placeholder="כתבו הערות לתלמידה..."
          style={{ ...styles.input, minHeight: '80px', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '4px', marginTop: '20px' }}>
        <button onClick={submitGrade} style={{ ...styles.loginBtn, flex: 1 }}>שמור ושלח</button>
        <button onClick={() => setSelectedSubmission(null)} style={{ ...styles.logoutBtn, flex: 1 }}>ביטול</button>
      </div>
    </div>
    
  </div>
  
)}
    </div>
  );
};

const styles = {
  // מרכוז כללי של הדף
  container: { 
  fontFamily: 'Segoe UI, Tahoma', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'center', // ממרכז אנכית (מלמעלה למטה)
  minHeight: '100vh',       // קובע שהגובה יהיה לפחות 100% מגובה המסך
  // backgroundColor: '#0a76e3ff', 
  direction: 'rtl',
   padding: '35px',
   marginRight: '-50px',
    position: 'relative',
    right: '-500px', 
    marginTop: '-40px',

  
                  // מסיר רווחים מיותרים בשולי הדף
},
  // ריבוע ההתחברות (Card)
  card: { 
    padding: '35px', 
    border: 'none', 
    borderRadius: '16px', 
    display: 'flex', 
    flexDirection: 'column', 
    width: '350px',
    height: '300px', 
    backgroundColor: '#075dadff',//רקע כרטיס
    boxShadow: '0 10px 25px rgba(7, 29, 127, 0.1)', // צל כחלחל עדין
    borderTop: '6px solid #59a4f9ff',//פס מעל הכרטיס
    marginRight: '-50px',
    position: 'relative',
    right: '-50px', },
  input: { 
    marginBottom: '12px', 
    padding: '12px 15px', 
    borderRadius: '8px', 
    border: '1px solid #ebe6e6ff',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: '#eeeae9ff',
    color: '#140101ff',
    transition: 'border-color 0.3s',
    '&:focus': { borderColor: '#e24a4aff' }
  },
  loginBtn: { 
    padding: '12px', 
    backgroundColor: '#4a90e2', 
    color: 'black', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '17px',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(74, 144, 226, 0.2)',
    transition: 'background-color 0.2s'
  },
  header: { 
    width: '90%', 
    maxWidth: '1000px',
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '15px 0', 
    borderBottom: '2px solid #f41010ff', 
    marginBottom: '30px',
    right: '-525px' 
  },
 mainContent: { 
  width: '90%', 
  maxWidth: '1000px',
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',    // ממרכז את התוכן בתוך ה-main אופקית
  justifyContent: 'center', // ממרכז את התוכן בתוך ה-main אנכית (אם יש גובה)
  margin: '200 auto',        // מבטיח שהאלמנט עצמו יהיה במרכז ביחס לאבא שלו
  padding: '20px',
  right: '-525px',
},
  grid: { 
    display: 'grid', 
    gap: '20px', 
    width: '100%', 
    maxWidth: '400px',
    marginBottom: '40px',
    right: '-525px' 
  },
  btn: { 
    padding: '14px', 
    backgroundColor: '#0726f0ff', 
    color: '#4a90e2', 
    border: '2px solid #4a90e2', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    fontWeight: '700',
    transition: 'all 0.2s',
    '&:hover': { backgroundColor: '#146dd2ff' },
    right: '-525px'
  },
  logoutBtn: { 
    backgroundColor: '#05305cff', 
    color: '#666', 
    border: 'none', 
    padding: '8px 15px', 
    borderRadius: '6px', 
    cursor: 'pointer',
    fontSize: '14px',
    right: '-525px'
  },
  submissionsSection: { width: '100%', marginTop: '30px' },
  subTitle: { 
    color: '#2c3e50',
    fontSize: '22px',
    borderRight: '4px solid #4a90e2', // פס כחול מימין לכותרת
    paddingRight: '15px',
    marginBottom: '20px',
    right: '-525px'
  },
  listContainer: { 
    display: 'row', 
    gap: '20px', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    width: '100%',
    right: '-525px'
  },
  // שינוי ה-itemCard מאדום לכחול נעים
  itemCard: { 
    padding: '20px', 
    border: '1px solid #e1e8f0', 
    borderRadius: '12px', 
    backgroundColor: '#0d2c68ff', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
    textAlign: 'right',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'translateY(-3px)' },
    right: '-525px'
  },
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(44, 62, 80, 0.7)', // רקע כהה כחלחל
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    right: '-525px'
  },
  modalContent: {
    backgroundColor: 'white', padding: '35px', borderRadius: '20px', width: '300px',
    display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    right: '-525px'
  }
};
export default App;