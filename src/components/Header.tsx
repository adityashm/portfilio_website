import Navbar, { NavbarProps } from './Navbar';

export default function Header(props: NavbarProps) {
  return <Navbar {...props} />;
}

export { Navbar };