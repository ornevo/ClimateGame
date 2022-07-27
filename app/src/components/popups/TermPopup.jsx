import React from "react"

export const TermPopup = ({ showTerm, closeTerm }) => {
    const className = (showTerm) ? 'open' : ''

    let terms = [{
        id: 101,
        title: 'גזי חממה',
        meaning: 'גזים אשר מונעים פליטת חום יעילה ובכך שומרים על טמפרטורה גבוהה יותר בכדור הארץ מאשר הטמפרטורה בה הוא היה אמור להיות'
    },
    {
        id: 102,
        title: 'אפקט חממה',
        meaning: 'פליטה מוגברת של גזי חממה מביאה להתחממות מוגברת. הטענה המקובלת היא שהעלייה בריכוז גזי החממה כתוצאה מפעילות האדם, היא שמשפיעה על אפקט החממה ובכך תורמת להתחממות מוגברת של כדור הארץ',
    },
    {
        id: 103,
        title: 'אפס פליטות',
        meaning: 'על מנת להפסיק את ההתחממות הגוברת, נרצה להוריד את כמות הפליטות שלנו ל-0'
    }]

    return (
        <div className={`background-backdrop overlay ${showTerm ? 'visible' : ''}`}>
            <section className={`term-bar flex flex-column ${className}`} >
                <div className="term-header">
                    <button className="close-btn" onClick={() => closeTerm()}>X</button>
                    <h1>מונחים חשובים</h1>
                    <hr></hr>
                </div>
                <ul className="term-list clean-list">
                    {terms.map(term =>
                        <li key={term.id} className="term-list-item">
                            <h2>{term.title}</h2>
                            <h4>{term.meaning + '.'}</h4><br></br>
                            <div>
                            </div>
                        </li>)}
                </ul>
            </section>
        </div>
    )
}
