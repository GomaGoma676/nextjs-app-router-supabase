import { notFound } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'
import type { Database } from '../../../../database.types'

type PageProps = {
  params: {
    todoId: string
  }
}

export default async function TodoDetailPage({ params }: PageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: todo, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', params.todoId)
    .single()
  if (!todo) return notFound()
  return (
    <div className="mt-16 p-8">
      <p>Task ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Status: {todo.completed ? 'done' : 'not yet'}</p>
      <p>
        Created at:{' '}
        {todo && format(new Date(todo.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
    </div>
  )
}
