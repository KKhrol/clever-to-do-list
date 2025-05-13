import React from 'react';

import type { SpacerProps } from './Spacer.styled';
import { SpacerComponent } from './Spacer.styled';

const Spacer: React.FC<SpacerProps> = props => <SpacerComponent {...props} />;

export default Spacer;
