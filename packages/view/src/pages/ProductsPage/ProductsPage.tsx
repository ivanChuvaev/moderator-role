import { PageWithSidebarLayout } from '@view/layouts/PageWithSidebarLayout/PageWithSidebarLayout'
import { Content } from '@view/components/Content/Content'
import { Sidebar } from '@view/components/Sidebar/Sidebar'

export const ProductsPage = () => {
    return (
        <PageWithSidebarLayout
            sidebar={<Sidebar showChats={false} />}
            content={
                <Content showChat={false} productId={1} onOpenChat={() => {}} />
            }
        />
    )
}
