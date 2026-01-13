import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByRole('button', { name: /create/i })

  await user.type(inputs[0], 'Testing React forms')
  await user.type(inputs[1], 'React Tester')
  await user.type(inputs[2], 'http://test.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
 
})