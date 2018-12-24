<?php
error_reporting(E_ALL); ini_set('display_errors', 1);

define('ALPHABET', range('a','z'));

function string2shard($id)
{
    $hash = sha1($id);
    $fragment = substr($hash, 0, 4);
    $int = base_convert($fragment, 16, 10) * 131;
    $remainder = (($int / 127) | 0) % 650;
    $pair = function() use ($remainder)
    {
        $limit = count(ALPHABET);
        $others = $limit - 1;
        for ($i = 0; $i < $limit; $i++)
        {
            for ($j = 0; $j < $others; $j++)
            {
                $pairs[] = ALPHABET[$i] . ALPHABET[($i + $j + 1) % $limit];
            }
        }
        return $pairs[$remainder];
    };

    return $pair();
}

var_dump(string2shard($_GET['id']));