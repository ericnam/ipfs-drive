const pull = require('pull-stream');

export const GetEntireDirectory = async (ipfs, dir) => {
  try {
    const files = await GetFiles(ipfs, dir);

    if (files.length === 0) {
      return;
    }
    
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
};

//  Get all files / directories in root of ipfs
//
export const GetFiles = async (ipfs, path) => {
  return await ipfs.files.ls(path, { long: true });
};

//  Write a new file to desired path, with buffer and name attr provided
//
export const WriteFile = async (ipfs, path, name, buffer) => {  
  await ipfs.files.write(
    path + name, 
    buffer, 
    {
      create: true
    }
  )
}; 

//  Create a new directory at given path
//
export const Mkdir = async (ipfs, path, parents = false) => {
  await ipfs.files.mkdir(
    path, 
    { parents : parents }  
  )
}

export const IsDirPopulated = async (ipfs, path) => {
  const files = await ipfs.files.ls(path);
  if (files.length > 0) {
    return true;
  }
  return false;
};