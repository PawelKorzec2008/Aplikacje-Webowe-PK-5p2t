import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CategoryBar from './CategoryBar.jsx'

describe('CategoryBar', () => {
  it('wywołuje onWybierz z poprawną kategorią po kliknięciu', async () => {
    // Arrange — przygotuj dane i funkcję-szpiega zamiast prawdziwego handlera
    const onWybierz = vi.fn()
    render(<CategoryBar aktywna="wszystkie" onWybierz={onWybierz} />)

    // Act — zrób to, co zrobiłby użytkownik
    await userEvent.click(screen.getByRole('button', { name: 'Góry' }))

    // Assert — sprawdź efekt
    expect(onWybierz).toHaveBeenCalledWith('gory')
  })

  it('oznacza aktywną kategorię przez aria-pressed', () => {
    render(<CategoryBar aktywna="gory" onWybierz={() => {}} />)

    expect(screen.getByRole('button', { name: 'Góry' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Morze' })).toHaveAttribute('aria-pressed', 'false')
  })
})
