import { Link as LinkLocation, LinkProps } from 'react-location';

import { Path } from './utils';

export const Link = (props: LinkProps & { to: Path }) => <LinkLocation {...props} />;
