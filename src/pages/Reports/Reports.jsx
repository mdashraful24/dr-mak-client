import { useState } from 'react';
import {
    BarChart3,
    LineChart,
    TrendingUp,
    TrendingDown,
    Download,
    Filter,
    Calendar,
    Users,
    DollarSign,
    ShoppingCart,
    Eye,
    RefreshCw,
    MoreVertical,
    CheckCircle,
    AlertCircle,
    BarChart,
    Target,
    ChevronDown,
    ChevronUp,
    Search,
    Printer,
    Share2,
    FileText,
    Database,
    Globe,
    CreditCard,
    Home,
    User,
    Menu,
    X,
    Smartphone,
    Tablet,
    Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    BarChart as RechartsBarChart,
    Bar,
    LineChart as RechartsLineChart,
    Line,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const Reports = () => {
    const [timeRange, setTimeRange] = useState('monthly');
    const [activeTab, setActiveTab] = useState('overview');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMetrics, setSelectedMetrics] = useState(['sales', 'users', 'revenue']);
    const [loading, setLoading] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Sample sales data
    const salesData = [
        { name: 'Jan', sales: 4000, revenue: 2400, profit: 2400 },
        { name: 'Feb', sales: 3000, revenue: 1398, profit: 2210 },
        { name: 'Mar', sales: 2000, revenue: 9800, profit: 2290 },
        { name: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
        { name: 'May', sales: 1890, revenue: 4800, profit: 2181 },
        { name: 'Jun', sales: 2390, revenue: 3800, profit: 2500 },
        { name: 'Jul', sales: 3490, revenue: 4300, profit: 2100 },
    ];

    // User growth data
    const userGrowthData = [
        { name: 'Jan', users: 400, newUsers: 240 },
        { name: 'Feb', users: 300, newUsers: 138 },
        { name: 'Mar', users: 200, newUsers: 980 },
        { name: 'Apr', users: 278, newUsers: 390 },
        { name: 'May', users: 189, newUsers: 480 },
        { name: 'Jun', users: 239, newUsers: 380 },
        { name: 'Jul', users: 349, newUsers: 430 },
    ];

    // Platform distribution data
    const platformData = [
        { name: 'Web', value: 400, color: '#3B82F6' },
        { name: 'Mobile', value: 300, color: '#10B981' },
        { name: 'Tablet', value: 200, color: '#F59E0B' },
        { name: 'Desktop', value: 278, color: '#EF4444' },
    ];

    // Payment methods data
    const paymentData = [
        { name: 'Credit Card', value: 45, color: '#8B5CF6' },
        { name: 'PayPal', value: 25, color: '#06B6D4' },
        { name: 'Bank Transfer', value: 15, color: '#F97316' },
        { name: 'Other', value: 15, color: '#EC4899' },
    ];

    // Key metrics - Responsive values
    const metrics = [
        {
            id: 'totalRevenue',
            title: 'Total Revenue',
            value: '$45.2K',
            change: '+20.1%',
            trend: 'up',
            icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />,
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'activeUsers',
            title: 'Active Users',
            value: '12.2K',
            change: '+18.2%',
            trend: 'up',
            icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'totalOrders',
            title: 'Total Orders',
            value: '4.6K',
            change: '+12.5%',
            trend: 'up',
            icon: <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />,
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'conversionRate',
            title: 'Conversion',
            value: '3.2%',
            change: '-2.1%',
            trend: 'down',
            icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />,
            color: 'from-yellow-500 to-yellow-600'
        }
    ];

    // Recent activities
    const activities = [
        {
            id: 1,
            user: 'John Doe',
            action: 'placed an order',
            target: 'Premium Plan',
            time: '2m ago',
            status: 'success',
            icon: <CheckCircle className="w-4 h-4 text-green-500" />
        },
        {
            id: 2,
            user: 'Sarah Smith',
            action: 'updated profile',
            target: 'Settings',
            time: '15m ago',
            status: 'info',
            icon: <User className="w-4 h-4 text-blue-500" />
        },
        {
            id: 3,
            user: 'Mike Johnson',
            action: 'cancelled',
            target: 'Business',
            time: '1h ago',
            status: 'warning',
            icon: <AlertCircle className="w-4 h-4 text-yellow-500" />
        },
        {
            id: 4,
            user: 'Emma Wilson',
            action: 'payment',
            target: '$299',
            time: '2h ago',
            status: 'success',
            icon: <CreditCard className="w-4 h-4 text-green-500" />
        },
        {
            id: 5,
            user: 'Alex Brown',
            action: 'logged in',
            target: 'New Device',
            time: '5h ago',
            status: 'info',
            icon: <Globe className="w-4 h-4 text-blue-500" />
        }
    ];

    // Top products - shortened for mobile
    const topProducts = [
        { id: 1, name: 'Premium Widget', sales: '1.2K', revenue: '$12K', growth: '+23%' },
        { id: 2, name: 'Basic Tool', sales: '987', revenue: '$9.9K', growth: '+15%' },
        { id: 3, name: 'Advanced Kit', sales: '765', revenue: '$23K', growth: '+34%' },
        { id: 4, name: 'Starter Pack', sales: '654', revenue: '$6.5K', growth: '+8%' },
        { id: 5, name: 'Pro Bundle', sales: '543', revenue: '$27K', growth: '+42%' },
    ];

    // Time range options - mobile optimized
    const timeRanges = [
        { id: 'daily', label: 'Day' },
        { id: 'weekly', label: 'Week' },
        { id: 'monthly', label: 'Month' },
        { id: 'quarterly', label: 'Qtr' },
        { id: 'yearly', label: 'Year' },
    ];

    // Tab options - mobile optimized
    const tabs = [
        { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'analytics', label: 'Analytics', icon: <LineChart className="w-4 h-4" /> },
        { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
        { id: 'export', label: 'Export', icon: <Download className="w-4 h-4" /> },
    ];

    // Simulate data refresh
    const refreshData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log('Data refreshed');
        }, 1500);
    };

    // Handle metric selection
    const handleMetricToggle = (metricId) => {
        setSelectedMetrics(prev =>
            prev.includes(metricId)
                ? prev.filter(id => id !== metricId)
                : [...prev, metricId]
        );
    };

    // Export data function
    const handleExportData = (format) => {
        const data = {
            salesData,
            userGrowthData,
            platformData,
            paymentData,
            metrics,
            activities,
            topProducts,
            exportedAt: new Date().toISOString()
        };

        let dataStr, mimeType, fileName;

        if (format === 'json') {
            dataStr = JSON.stringify(data, null, 2);
            mimeType = 'application/json';
            fileName = `reports-${new Date().toISOString().split('T')[0]}.json`;
        } else if (format === 'csv') {
            const csvRows = [];
            const headers = Object.keys(salesData[0]);
            csvRows.push(headers.join(','));

            salesData.forEach(row => {
                const values = headers.map(header => row[header]);
                csvRows.push(values.join(','));
            });

            dataStr = csvRows.join('\n');
            mimeType = 'text/csv';
            fileName = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;
        }

        const blob = new Blob([dataStr], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 text-sm">
                    <p className="font-semibold text-gray-800 mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-xs" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4 py-6 mt-14">
            <div>

                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group mb-3 sm:mb-4"
                            >
                                <Home size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm sm:text-base">Return to Home</span>
                            </Link>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                                    Analytics & Reports
                                </h1>
                                <button
                                    onClick={refreshData}
                                    disabled={loading}
                                    className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Track performance, analyze trends, and generate insights
                            </p>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center gap-2 sm:hidden">
                            <button
                                onClick={() => handleExportData('json')}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md text-sm"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden sm:flex items-center gap-2 md:gap-3">
                            <button className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm md:text-base">
                                <Printer className="w-4 h-4" />
                                <span className="hidden md:inline">Print</span>
                            </button>
                            <button className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm md:text-base">
                                <Share2 className="w-4 h-4" />
                                <span className="hidden md:inline">Share</span>
                            </button>
                            <button
                                onClick={() => handleExportData('json')}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm md:text-base"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs - Responsive */}
                    <div className="flex overflow-x-auto pb-2 -mx-3 sm:mx-0 sm:overflow-visible sm:pb-0">
                        <div className="flex space-x-1 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm min-w-max sm:min-w-0">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 text-sm md:text-base whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="hidden sm:inline">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters and Time Range - Responsive */}
                <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm sm:text-base flex-1 sm:flex-none"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm focus:shadow-md focus:outline-none focus:border-blue-400 transition-all duration-200 w-full lg:w-64 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm p-1 overflow-x-auto w-full sm:w-auto">
                            {timeRanges.map(range => (
                                <button
                                    key={range.id}
                                    onClick={() => setTimeRange(range.id)}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap ${timeRange === range.id
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>

                        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 font-medium text-sm md:text-base">
                            <Calendar className="w-4 h-4" />
                            <span className="hidden lg:inline">Date Range</span>
                        </button>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="mb-6 sm:mb-8 bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Filter Metrics</h3>
                            <button
                                onClick={() => {
                                    setSelectedMetrics(['sales', 'users', 'revenue']);
                                }}
                                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Reset
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
                            {['sales', 'users', 'revenue', 'profit', 'conversion', 'engagement'].map((metric) => (
                                <button
                                    key={metric}
                                    onClick={() => handleMetricToggle(metric)}
                                    className={`p-2 sm:p-3 rounded-xl border transition-all duration-200 flex items-center justify-center text-xs sm:text-sm ${selectedMetrics.includes(metric)
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="font-medium capitalize">{metric}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Metrics - Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    {metrics.map(metric => (
                        <div
                            key={metric.id}
                            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-linear-to-br from-gray-50 to-gray-100">
                                    {metric.icon}
                                </div>
                                <div className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm ${metric.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                                    <span className="font-medium">{metric.change}</span>
                                </div>
                            </div>
                            <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 truncate">{metric.title}</h3>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">{metric.value}</p>
                            <div className="mt-2 sm:mt-4 h-1.5 sm:h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full bg-linear-to-r ${metric.color} rounded-full`} style={{ width: metric.trend === 'up' ? '75%' : '45%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Sales Chart */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Sales Overview</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">Monthly performance</p>
                            </div>
                            <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <div className="h-48 sm:h-60 md:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#6b7280"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* User Growth Chart */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">User Growth</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">New vs Returning</p>
                            </div>
                            <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <div className="h-48 sm:h-60 md:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#6b7280"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="users" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                                    <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Platform Distribution */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Platform Distribution</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">Device usage</p>
                            </div>
                            <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <div className="h-48 sm:h-60 md:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={platformData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={60}
                                        innerRadius={30}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {platformData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Payment Methods</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">Preferred options</p>
                            </div>
                            <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <div className="h-48 sm:h-60 md:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={paymentData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#6b7280"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        tick={{ fontSize: 10 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {paymentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Bottom Grid - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Recent Activities */}
                    <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Recent Activities</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">Latest user actions</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium">
                                View All
                            </button>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {activities.map(activity => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                        <div className="p-1.5 sm:p-2 rounded-lg bg-gray-50 shrink-0">
                                            {activity.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-gray-600 text-xs sm:text-sm truncate">{activity.target} • {activity.time}</p>
                                        </div>
                                    </div>
                                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors shrink-0 ml-2">
                                        <Eye className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Top Products</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">Best performers</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium">
                                View All
                            </button>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {topProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                                            <span className="text-white text-xs sm:text-sm font-bold">{product.id}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{product.name}</p>
                                            <p className="text-gray-600 text-xs sm:text-sm truncate">{product.sales} sold</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-2">
                                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{product.revenue}</p>
                                        <p className={`text-xs sm:text-sm ${product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.growth}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Export Options - Responsive */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Export Reports</h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Download data</p>
                        </div>
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        <button
                            onClick={() => handleExportData('json')}
                            className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">JSON Export</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Complete dataset</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs text-left">All charts and metrics</p>
                        </button>

                        <button
                            onClick={() => handleExportData('csv')}
                            className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                                    <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">CSV Export</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Tabular data</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs text-left">Spreadsheet format</p>
                        </button>

                        <button
                            onClick={() => window.print()}
                            className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 group col-span-1 sm:col-span-2 md:col-span-1"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                                    <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Print Report</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Physical copy</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs text-left">Optimized for printing</p>
                        </button>
                    </div>
                </div>

                {/* Summary Stats - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-linear-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-200">
                        <p className="text-blue-700 font-medium text-xs sm:text-sm">Avg. Session</p>
                        <p className="font-bold text-blue-800 text-lg sm:text-xl md:text-2xl">4m 32s</p>
                    </div>
                    <div className="bg-linear-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-200">
                        <p className="text-green-700 font-medium text-xs sm:text-sm">Bounce Rate</p>
                        <p className="font-bold text-green-800 text-lg sm:text-xl md:text-2xl">32.5%</p>
                    </div>
                    <div className="bg-linear-to-r from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-200">
                        <p className="text-purple-700 font-medium text-xs sm:text-sm">Page Views</p>
                        <p className="font-bold text-purple-800 text-lg sm:text-xl md:text-2xl">12.4K</p>
                    </div>
                    <div className="bg-linear-to-r from-orange-50 to-orange-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-orange-200">
                        <p className="text-orange-700 font-medium text-xs sm:text-sm">New Sessions</p>
                        <p className="font-bold text-orange-800 text-lg sm:text-xl md:text-2xl">68.2%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
