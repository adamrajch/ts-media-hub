import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Nav from '../components/Nav/Nav';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Welcome />
      <Welcome />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
