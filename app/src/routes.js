import WelcomeView from '../src/components/WelcomeView.jsx'
import GameView from '../src/components/GameView.jsx'
import About from '../src/components/About.jsx'

const routes = [
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