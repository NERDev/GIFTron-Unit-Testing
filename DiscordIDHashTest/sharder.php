<?php

define('ALPHABET', range('a','z'));

function string2shard($id)
{
    $hash = sha1($id);
    $fragment = substr($hash, 0, 6);
    $int = base_convert($fragment, 16, 10) * 439;
    $remainder = (($int / 311) | 0) % 676;
    $shard = substr('0' . base_convert($remainder, 10, 26), -2);
    return implode('', array_map(
        function($v){
            return ALPHABET[base_convert($v, 26, 10)];
        },
        str_split($shard)
    ));
}

var_dump(string2shard('test'));