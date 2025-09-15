import { getByText, render, screen} from "@testing-library/react"
import UserProfile from "../UserProfile";

test('renders loading state initally',()=>{
    render(<UserProfile userId={1} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});