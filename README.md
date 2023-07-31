# Fileman 📪

A CLI to navigate your file directory.

# Commands
All commands start with the root command:
```
fileman 
```

## Viewing Files

Viewing files within a directory:

```
fileman -l [optional directory path]
```
`[optional directory path]` is a string of the path of a directory to view.

## Creating Files/Folders

Creating a folder:
```
fileman -m <new_name_of_folder>
```
Creating a file name:
```
filename -t <new_name_of_file>
```

## Reading Files

You can read files within the directory of source code (the directory can be found using the `-ls` command):
```
filename -r <file_name_within_source_code_directory>
```

## Writing to Files ✍️

You can edit and write files within the directory of source code (the directory can be found using the `-ls` command).

"Space":
```
/-

# Example
fileman -wr <filename>:/-There/-will/-be/-a/-space/-between/-each/-word

```

"New Line" Syntax:
```
\\ 

# Example
fileman -wr <filename>:\\This/-print/-on/-a/-new/-line

```


## Help 

The Doc will be printed by typing:
```
fileman -h
```

The doc will have all commands and their details within this CLI.

