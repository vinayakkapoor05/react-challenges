import { createFileRoute } from '@tanstack/react-router'
import App from '../App';


export const Route = createFileRoute('/course/edit/$id')({
  component: App,
})

