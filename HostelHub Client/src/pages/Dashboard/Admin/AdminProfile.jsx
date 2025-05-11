import {
    Card,
    Flex,
    Avatar,
    Heading,
    Text,
    Separator,
    Grid,
    Badge,
    Box,
    Container
} from "@radix-ui/themes";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import Spinner from "../../shared/LoadingSpinner/Spiner";
import useAdmin from "../../../hooks/useAdmin";
import { FiUsers, FiPieChart, FiCalendar, FiAward } from 'react-icons/fi';

const AdminProfile = () => {
    const { user } = useAuth();
    const [isAdmin = true, isAdminLoading] = useAdmin();
 
    const { isLoading, error, data: mealsCount } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure('/mealsCount');
                return data;
            } catch (error) {
                console.error(error);
            }
        }
    })

    if (isLoading || isAdminLoading) return (
        <Container size="2" className="flex justify-center items-center h-64">
            <Spinner />
        </Container>
    );

    if (error) return (
        <Container size="2" className="text-center py-8">
            <Text color="red">Error loading admin data: {error.message}</Text>
        </Container>
    );

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <Card className="shadow-sm hover:shadow-md transition-all">
                <Flex gap="4" align="center">
                    <Avatar
                        size="6"
                        src={user?.photoURL}
                        fallback={user?.displayName?.charAt(0) || 'A'}
                        radius="full"
                        className="border-2 border-indigo-100 shadow-sm"
                    />
                    <Flex direction="column">
                        <Flex align="center" gap="2">
                            <Heading size="5" weight="bold">{user?.displayName}</Heading>
                            <Badge color={isAdmin ? 'violet' : 'gray'} variant="soft">
                                {isAdmin ? 'Administrator' : 'Staff'}
                            </Badge>
                        </Flex>
                        <Text color="gray" size="2">{user?.email}</Text>
                        <Text color="gray" size="2">Joined: {new Date(user?.metadata?.creationTime).toLocaleDateString()}</Text>
                    </Flex>
                </Flex>

                <Separator my="4" size="4" />

                {/* Quick Stats */}
                <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
                    <StatCard
                        icon={<FiPieChart size={20} />}
                        title="Total Meals"
                        value={adminStats?.totalMeals || 0}
                        change="+12% this month"
                    />
                    <StatCard
                        icon={<FiUsers size={20} />}
                        title="Active Users"
                        value={adminStats?.activeUsers || 0}
                        change="+5% this week"
                    />
                    <StatCard
                        icon={<FiCalendar size={20} />}
                        title="Pending Reviews"
                        value={adminStats?.pendingReviews || 0}
                        change="3 new today"
                    />
                    <StatCard
                        icon={<FiAward size={20} />}
                        title="Top Rated Meal"
                        // value={adminStats?.topRatedMeal?.rating || 0}
                        // subtitle={adminStats?.topRatedMeal?.title || 'N/A'}
                    />
                </Grid>
            </Card>

            {/* Recent Activity Section */}
            <Card className="shadow-sm hover:shadow-md transition-all">
                <Heading size="4" mb="4">Recent Activity</Heading>
                <Box className="space-y-3">
                    {adminStats?.recentActivity?.map((activity, index) => (
                        <ActivityItem
                            key={index}
                            action={activity.action}
                            target={activity.target}
                            timestamp={activity.timestamp}
                        />
                    )) || <Text color="gray">No recent activity</Text>}
                </Box>
            </Card>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, change, subtitle }) => (
    <Card variant="surface" className="hover:bg-gray-50 transition-colors">
        <Flex gap="3" align="center">
            <Box className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                {icon}
            </Box>
            <Flex direction="column">
                <Text size="2" color="gray">{title}</Text>
                <Heading size="5">{value}</Heading>
                {subtitle && <Text size="1" color="gray">{subtitle}</Text>}
                {change && <Text size="1" color="green">{change}</Text>}
            </Flex>
        </Flex>
    </Card>
);

// Reusable Activity Item Component
const ActivityItem = ({ action, target, timestamp }) => (
    <Flex gap="3" align="center" className="border-b border-gray-100 pb-3 last:border-0">
        <Avatar
            size="2"
            radius="full"
            fallback="A"
            className="bg-indigo-50 text-indigo-600"
        />
        <Box>
            <Text size="2">
                <Text weight="bold">{action}</Text> {target}
            </Text>
            <Text size="1" color="gray">{new Date(timestamp).toLocaleString()}</Text>
        </Box>
    </Flex>
);

export default AdminProfile;