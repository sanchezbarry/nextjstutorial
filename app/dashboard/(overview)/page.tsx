import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
//suspense is used for streaming
import { Suspense } from 'react';
//skeletons to show while data is fetching
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

//folders create nested routing in nextjs. To create an additional folder without routing ()
//So things like your layout can be applied to specific pages only, use brackets.

export default async function Page() {

  //Doing this results in a waterfall - we need to wait for fetchRevenue() to execute before fetchLatestInvoices() can start running, and so on.
  //It is not necessarily bad, but can be unintentional and can impact performance. 
  //Could be useful when you want to satisfy a condition before the next request. 
  //A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />
        </Suspense>
        
      </div>
    </main>
  );
}

/* Where you place your suspense will depend how how you want your user to experience the page as
it streams. You could stream the whole page at once, or every component individually (could lead to
  UI popping) or section and stagger the components - create wrapper components for this.
)
*/