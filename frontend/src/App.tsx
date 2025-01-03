import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import UserProfile from './components/UserProfile';  // Import the UserProfile component

function App() {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-primary">DaisyUI & Radix UI</h1>

                {/* DaisyUI Button */}
                <button className="btn btn-primary mt-6">DaisyUI Button</button>

                {/* Radix UI Dropdown */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="btn btn-secondary mt-6">Radix UI Dropdown</button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="p-2 bg-white border rounded shadow-lg">
                        <DropdownMenu.Item className="p-2 hover:bg-gray-200">Item 1</DropdownMenu.Item>
                        <DropdownMenu.Item className="p-2 hover:bg-gray-200">Item 2</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                {/* UserProfile Component */}
                <div className="mt-8">
                    <UserProfile />
                </div>
            </div>
        </div>
    );
}

export default App;
