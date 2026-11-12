/* 版本副本（与根目录 VERSION 同源）。客户端是单文件、由宿主直接加载，
   没地方 import 根目录文件，所以这里落一份字面量；check-version.mjs 比对。 */
export const version = '0.1.2-rc.1'
