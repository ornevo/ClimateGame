import WelcomeView from '../src/components/WelcomeView.jsx'
import GameView from '../src/components/GameView.jsx'
import About from '../src/components/About.jsx'
import {HighScore} from '../src/components/HighScore.jsx'
import {GameStats} from '../src/components/GameStats.jsx'

const routes = [
    {
        path: '/stats',
        component: <GameStats />,
    },
    {
        path: '/score',
        component: <HighScore />,
    },
    {
        path: '/about',
        component: <About />,
    },
    {
        path: '/play',
        component: <GameView />,
    },
    {
        path: '/',
        component: <WelcomeView />,
    },
]

export default routes