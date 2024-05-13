import DashboardSkeleton from '@/app/ui/skeletons';
 
export default function Loading() {
  return <DashboardSkeleton />;
}

//this streams the whole page
//sidenav is a static component, so it loads immediately. 
//with this the user can do interruptable navgiation, click another page before the page is loaded
