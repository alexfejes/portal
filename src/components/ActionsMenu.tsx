import { useState } from 'react'
// FIX 1: import createPortal
// Lets us render JSX into a different DOM node than the parent's.
// import { createPortal } from 'react-dom'
import './ActionsMenu.css'

type Props = { items: string[]; onSelect: (item: string) => void }

export function ActionsMenu({ items, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  // FIX 2: remember where the button is on screen
  // Outside the card, the menu can't anchor to the button with CSS anymore.
  // const [rect, setRect] = useState<DOMRect>()

  const menu = (
    <ul
      className="menu menu--inline"
      // FIX 4: replace the className above with these two lines (fixed position from the button's rect)
      // position: fixed places the menu on screen, right under the button.
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
        onClick={() => setOpen(!open)}
        // FIX 3: replace the onClick above with this one (measure the button on click)
        // getBoundingClientRect() gives the button's position in the viewport.
        // onClick={(e) => { setRect(e.currentTarget.getBoundingClientRect()); setOpen(!open) }}
      >
        ⋯
      </button>

      {/* Flawed: the menu renders inside .card, whose overflow: hidden clips it. */}
      {open && menu}
      {/* FIX 5: replace the line above with this one (render the menu into <body>) */}
      {/* <body> has no overflow: hidden, so nothing clips it. State and events still work as usual. */}
      {/* {open && createPortal(menu, document.body)} */}
    </div>
  )
}
