import type { ReactNode } from 'react'
import './DashboardCard.css'

type DashboardCardProps = {
  title: string
  actions?: ReactNode
  children: ReactNode
}

// A typical dashboard widget. Note `.card { overflow: hidden }` in the CSS:
// it's there so the rounded corners clip the chart/content nicely — a very
// common pattern. It is also what traps any absolutely-positioned child.
export function DashboardCard({ title, actions, children }: DashboardCardProps) {
  return (
    <section className="card">
      <header className="card__header">
        <h2 className="card__title">{title}</h2>
        {actions}
      </header>
      <div className="card__body">{children}</div>
    </section>
  )
}
