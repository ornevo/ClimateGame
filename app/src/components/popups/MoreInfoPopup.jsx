import React from "react"
import { NavLink } from "react-router-dom"

export const MoreInfoPopup = ({ showMoreInfo, closeMoreInfo }) => {
  const className = showMoreInfo ? "open" : ""

  return (
    <div
      className={`background-backdrop overlay ${showMoreInfo ? "visible" : ""}`}
    >
      <section className="more-info-bar flex flex-column">
        <h1>שאפו ענק, השלמת את המשחק!</h1>
        <hr></hr>
        <h4 className="more-info-list-item">
          בין אם מדדי הסיום שלך מצוינים ובין אם יש לך עוד מה ללמוד, עכשיו מגיע
          החלק האמיתי.
        </h4>
        <h1 className="more-info-header">רוצה ללמוד?</h1>
        <hr></hr>
        <h4 className="more-info-list-item">
          מעלה וחצי - סדרת סרטונים סביב המדע והעובדות סביב משבר האקלים. פודקאסט
          ״האקלימיסטים״ אתר אקלים ישראל ועוד ועוד…
        </h4>
        <h1 className="more-info-header">רוצה לפעול?</h1>
        <hr></hr>
        <h4 className="more-info-list-item">
          בארץ יש ארגונים רבים ומגוונים שעוסקים במרץ בתחומים שונים סביב המאבק.
          התחילו לחקור אותם הפועלים בארץ ולחבור לפעילותם.
          <br></br>
          בנוסף, ישנן דרכים רבות לצמצום צריכה אישי: לצמצם את צריכת התזונה מבוססת
          חי, להתנייד באמצעים משותפים, לחסוך בשימוש באנרגיה ובמוצרים מזהמים.
        </h4>

        <hr></hr>
        <section className="more-info-btn-container flex flex-column">
          <button className="more-info-btn">
            <NavLink to="/play" className="btn-link">
              שחק שוב
            </NavLink>
          </button>
          <button className="more-info-btn">
            <NavLink to="/" className="btn-link">
              דף הבית
            </NavLink>
          </button>
        </section>
      </section>
    </div>
  )
}
