import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/retroui/Card'
import { Text } from '@/components/retroui/Text'
import { Button } from '@/components/retroui/Button'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { blogs } from '@/db/schema'

// Static blog data
const getBlogPosts = createServerFn().handler(async () => {
  const data = await db.select().from(blogs);
  return data;
})

export const Route = createFileRoute('/')({
  component: BlogListPage,
  loader: async () => {
    const blogs = await getBlogPosts()
    return { blogs }
  } 
})

function BlogListPage() {
  const {blogs} =  Route.useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Text as="h1" className="mb-2 text-foreground">
          TanStack Blog
        </Text>
        <Text className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A full-stack open-source blog template built with TanStack Start and RetroUI
        </Text>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <Card key={post.id} className="h-full flex flex-col hover:translate-none transition-transform shadow-none rounded-md">
            <Card.Header>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <span>{post.createdAt.toLocaleDateString()}</span>
                {/* <span>|</span>
                <span>by {post.author}</span> */}
              </div>
              <Card.Title className="line-clamp-2 text-foreground">
                {post.title}
              </Card.Title>
              <Card.Description className="line-clamp-3 flex-grow">
                {post.content}
              </Card.Description>
            </Card.Header>

            <Card.Content className="pt-0 mt-auto">
              <Button size="sm">
                Read More
              </Button>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  )
}