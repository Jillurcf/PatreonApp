// __mocks__/react-native-mmkv-storage.js
export const MMKVLoader = jest.fn().mockImplementation(() => ({
  initialize: jest.fn().mockReturnValue({
    setString: jest.fn(),
    getString: jest.fn(),
    removeItem: jest.fn(),
  }),
}));

// __mocks__/react-native-share.js
export default { open: jest.fn() };

// __mocks__/react-native-svg.js
export const SvgXml = () => null;
