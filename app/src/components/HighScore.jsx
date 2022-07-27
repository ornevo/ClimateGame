import React from 'react'

export const HighScore = () => {

    let scores = [
        {
            name: 'סיוון',
            emissions: 0,
            quality: 55,
            totalScore: 155
        },
        {
            name: 'אליאב',
            emissions: 0,
            quality: 43,
            totalScore: 143
        },
        {
            name: 'איר',
            emissions: 0,
            quality: 24,
            totalScore: 124
        },
        {
            name: 'שרון',
            emissions: 1,
            quality: 33,
            totalScore: 123
        },
        {
            name: 'זמיר',
            emissions: 1,
            quality: 15,
            totalScore: 105
        },
        {
            name: 'תמר',
            emissions: 2,
            quality: 23,
            totalScore: 103
        },
        {
            name: 'טל',
            emissions: 3,
            quality: 31,
            totalScore: 101
        },
        {
            name: 'שירה',
            emissions: 2,
            quality: 15,
            totalScore: 95
        },
        {
            name: 'גדעון',
            emissions: 1,
            quality: 4,
            totalScore: 94
        },
        {
            name: 'אלון',
            emissions: 1,
            quality: 3,
            totalScore: 93
        },
    ]

    return (
        <div className="score-dashboard-container flex flex-column">
            <h1>טבלת מובילים</h1>
            <section className="high-score-board-recap flex">
                <div className='total-gamers'>
                    <p className='gamers-info'>מספר שחקנים</p>
                    <span className='gamers-info-details'>{scores.length}</span>
                </div>
                <div className='high-score'>
                    <p className='gamers-info'>הניקוד הגבוה ביותר</p>
                    <span className='gamers-info-details'>{scores[0].totalScore}</span>
                </div>
                <div className='high-score-gamer'>
                    <p className='gamers-info'>השחקן הטוב ביותר</p>
                    <span className='gamers-info-details'>{scores[0].name}</span>
                </div>
            </section>

            <table className='score-table' cellPadding="0" cellSpacing="0" border="0">
                <thead className='score-table-header'>
                    <tr>
                        <th className='score-th'>דירוג</th>
                        <th className='score-th'>שחקן</th>
                        <th className='score-th'>פליטות</th>
                        <th className='score-th'>איכות חיים</th>
                        <th className='score-th'>ניקוד סופי</th>
                    </tr>
                </thead>

                <tbody className='score-table-body'>
                    {scores.map((score, idx) => <tr key={idx}>
                        <td className="score-td" data-label="RANK">{idx + 1}</td>
                        <td className="score-td" data-label="GAMER">{score.name}</td>
                        <td className="score-td" data-label="EMISSIONS">{score.emissions}</td>
                        <td className="score-td" data-label="QUALITY">{score.quality}</td>
                        <td className="score-td" data-label="TOTAL SCORE">{score.totalScore}</td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    )
}
