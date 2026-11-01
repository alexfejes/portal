import { useState } from 'react'
// FIX 1: import createPortal
// createPortal renders JSX into a different DOM node, but it stays part of this component.
// import { createPortal } from 'react-dom'
import './ActionsMenu.css'

type Props = { items: string[]; onSelect: (item: string) => void }

export function ActionsMenu({ items, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  // FIX 2: remember where the button is on screen
  // Once the menu lives in <body>, CSS can't place it next to the button, so we track the position ourselves.
  // const [rect, setRect] = useState<DOMRect>()

  const menu = (
    <ul
      className="menu menu--inline" // FIX 4: replace this line
      // FIX 4: replace the className above with these two lines
      // menu--portal uses position: fixed, and top/left place the menu right under the button.
      // className="menu menu--portal"
      // style={rect && { top: rect.bottom + 6, left: rect.right }}
    >
      {items.map((item) => (
        <li key={item} className="menu__item" onClick={() => { onSelect(item); setOpen(false) }}>
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="actions">
      <button
        className="actions__trigger"
        onClick={() => setOpen(!open)} // FIX 3: replace this line
        // FIX 3: replace the onClick above with this one
        // getBoundingClientRect() measures the button's position on screen when it's clicked.
        // onClick={(e) => { setRect(e.currentTarget.getBoundingClientRect()); setOpen(!open) }}
      >
        ⋯
      </button>

      {open && menu /* FIX 5: replace this line */}
      {/* FIX 5: replace the line above with this one */}
      {/* Right now the menu renders inside .card, whose overflow: hidden cuts it off. In <body>, nothing clips it. */}
      {/* {open && createPortal(menu, document.body)} */}
    </div>
  )
}
