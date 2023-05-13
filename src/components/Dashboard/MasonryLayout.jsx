import * as React from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import '../../theme/css/Masonry.css';

export default function MasonryLayout({ children }) {
  return (
    <Box
      mx={'6vw'}
      mt={4}
      className="masonry"
      sx={{
        columnCount: 6,
        columnGap: 4,
        '.masonry-item': {
          breakInside: 'avoid',
          mb: 4,
        },
        '@media screen and (max-width: 90em)': {
          columnCount: 4,
        },
        '@media screen and (max-width: 62em)': {
          columnCount: 3,
        },
        '@media screen and (max-width: 48em)': {
          columnCount: 2,
        },
      }}
    >
      {children.map((child) => (
        <Box key={child.id} className="masonry-item">
          {child}
        </Box>
      ))}
    </Box>
  );
};

MasonryLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
