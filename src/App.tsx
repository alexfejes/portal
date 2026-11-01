import { useState } from 'react'
import { DashboardCard } from './components/DashboardCard'
import { ActionsMenu } from './components/ActionsMenu'
import './App.css'

const MENU_ITEMS = [
  'View details',
  'Refresh data',
  'Export as CSV',
  'Duplicate widget',
  'Move to top',
  'Remove widget',
]

const STATS = [
  { title: 'Revenue', value: '$48,290', delta: '+12.4%', up: true },
  { title: 'Active users', value: '3,812', delta: '+4.1%', up: true },
  { title: 'Churn', value: '2.3%', delta: '-0.6%', up: false },
]

function App() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <h1>Overview</h1>
        <p className="hint">
          Click <kbd>⋯</kbd> on any card. Notice how the menu is sliced off at
          the card's bottom border — the card has <code>overflow: hidden</code>.
        </p>
      </header>

      <div className="grid">
        {STATS.map((stat) => (
          <DashboardCard
            key={stat.title}
            title={stat.title}
            actions={
              <ActionsMenu
                items={MENU_ITEMS}
                onSelect={(item) => setLastAction(`${item} → ${stat.title}`)}
              />
            }
          >
            <p className="stat">{stat.value}</p>
            <p className={stat.up ? 'delta delta--up' : 'delta delta--down'}>
              {stat.delta} vs last month
            </p>
          </DashboardCard>
        ))}
      </div>

      <p className="last-action" aria-live="polite">
        {lastAction ? `Last action: ${lastAction}` : 'No action selected yet.'}
      </p>
    </main>
  )
}

export default App
