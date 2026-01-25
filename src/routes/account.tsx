import { Button } from '@/components/retroui/Button'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data: session } = authClient.useSession()


    return <div>Hello "/account"! {session ? JSON.stringify(session.user) : 'Not logged in'}

        {session && <Button onClick={() => authClient.signOut()}>Log Out</Button>}
    </div>
}
