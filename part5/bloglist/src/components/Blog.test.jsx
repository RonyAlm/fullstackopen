import { render, screen } from '@testing-library/react'
import { expect, test, describe, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
   
   let container
   const blog = {
     title: 'React patterns',
     author: 'Michael Chan',
     url: 'https://reactpatterns.com/',
     likes: 7,
     user: {
       name: 'Matti Luukkainen'
     }
   }
   const mockHandler = vi.fn()
   const user = userEvent.setup()
   
   beforeEach(() => {
    container = render(<Blog blog={blog} user={{ name: 'Matti Luukkainen' }} updateBlog={mockHandler} />).container
   })

   test('renders content', () => {
     const element = screen.getByText('React patterns')
     // screen.debug(element)
     expect(element).toBeDefined()
   })

   test('displays blog title and author but hides url and likes by default', () => {
     const element = screen.getByText('React patterns')
     expect(element).toBeDefined()
     const author = screen.getByText('Michael Chan')
     expect(author).toBeDefined()
     
     const details = container.querySelector('.details')
     expect(details).toHaveStyle('display: none')
   })

   test('shows blog URL and likes when the details toggle button is clicked', async () => {
    //  const user = userEvent.setup()
     const button = screen.getByText('view')
     await user.click(button)
     const details = container.querySelector('.details')
     expect(details).not.toHaveStyle('display: none')
   });

   test('clicking the like button twice calls event handler twice', async () => {
    //  const mockHandler = vi.fn()
     const buttonLike = screen.getByText('Like')
   
     await user.click(buttonLike)
     await user.click(buttonLike)
     expect(mockHandler.mock.calls).toHaveLength(2)
   })

})
