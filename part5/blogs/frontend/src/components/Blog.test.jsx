import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kid Super',
    url: 'http://example.com',
    likes: 42,
    user: { username: 'testuser' }
  }

 render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      deleteBlog={() => {}}
      user={{ username: 'testuser' }}
    />
  )

  // Title and author are visible in the summary
  const summary = screen.getByTestId('blog-summary')
  expect(summary).toHaveTextContent('Component testing is done with react-testing-library Kid Super')

  // URL and likes are not rendered by default
  const details = screen.getByTestId('blog-details')
  expect(details).toHaveStyle('display: none')
})

test('shows url and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kid Super',
    url: 'http://example.com',
    likes: 42,
    user: { username: 'testuser' }
  }

  render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      deleteBlog={() => {}}
      user={{ username: 'testuser' }}
    />
  )

  // Click the "view" button to show details
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // Now the details should be visible
  const details = screen.getByTestId('blog-details')
  expect(details).toHaveStyle('display: block;') // Should be visible (not display: none)
  expect(details).toHaveTextContent('http://example.com')
  expect(details).toHaveTextContent('likes 42')
})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kid Super',
    url: 'http://example.com',
    likes: 42,
    user: { username: 'testuser' }
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      updateLikes={mockHandler}
      deleteBlog={() => {}}
      user={{ username: 'testuser' }}
    />
  )

  // Click the "view" button to show details
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

