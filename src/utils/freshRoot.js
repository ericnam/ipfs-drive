import { GetFiles, WriteFile, GetEntireDirectory } from '@Utils/ipfsHelper';
import { FILE, FOLDER } from '@Utils/constants';
import { ELOOP } from 'constants';
const pull = require('pull-stream');

const IPFSNode = require('ipfs');

// This is the user's first time opening his ipfs drive
// We need to create a file and upload to ipfs

const freshRoot = {
  // hash here
  '1382b6993e9f270cb1c29833be3f5750': {
    type: '__folder__',
    name: 'root',
    path: '/',
    size: 0,
    date: '2019-04-07',
    creatorName: 'admin',
    parentPath: null,
    parentID: null,
    children: [
      '9b6739960c1ac83251046da2c718019b',
      '147d0ef33fe657ce53a83de6a630473d',
      'a55cfa9e1bf87138edd25c4b1553104d',
      '5f2b4d35489a8617e574060b19b7cad9',
      'ab7e413a3798155e37a9361140522e39',
      '891debd77d0bc40d30ff7d7e6c628e9f'
    ]
  }
};

async function InitDrive (ipfs) {
  try {
    const rootFiles = await GetFiles(ipfs, '/');
    if (rootFiles.length === 0) {
      await WriteFile (ipfs, '/', 'ReadMe.txt', IPFSNode.Buffer.from('Welcome to ipfs drive!'));
    }
  } catch (err) {
    console.error(err);
  }
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index ++) {
    await callback(array[index], index, array);
  }
}

async function GetFullDirectory (ipfs, dir) {
  try {
    const files = await GetFiles(ipfs, dir);
    if (files.length === 0) {
      return;
    }
    // need to manipulate name to include full path
    var mutableFiles = files.slice(0);
    mutableFiles.forEach((ele) => {
      ele.name = dir === '/' ? dir + ele.name : dir + '/' + ele.name
    });

    await asyncForEach(mutableFiles, async (ele) => { 
      if (ele.type == FOLDER) {
        const subDirectory = await GetFullDirectory(
          ipfs, 
          ele.name
        );
        Array.prototype.push.apply(mutableFiles, subDirectory)
      }
    });
    return mutableFiles;
  } catch (err)
  {
    console.error(err);
  }
}

async function MergeSubDirectories (ipfs, path) {


  const subDirectory = await GetFullDirectory(ipfs, "/" + ele.name);
}

const freshRootFileSystem = async (ipfs) => {  
  await InitDrive(ipfs);  
  const fulldirectory = await GetFullDirectory(ipfs, '/');
  console.log("look below");
  console.log(fulldirectory);
  const rootFiles = await GetFiles(ipfs, '/');
  return fulldirectory;
};

export default freshRootFileSystem;
