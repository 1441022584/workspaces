<?php
/**
 * 文件上传
 * www.shouce.ren
*/
class UploaderDemo{
	public $_max_upload_filesize =1024;							//最大上传大小;
	public $_image_path = '/upload/temp/images/';        		//默认图片上传路径
	public $_file_path = '/upload/temp/files/';          		//默认文件上传路径
	public $_real_name = '';									//原始文件名
	public $_tmp_name = '';										//临时文件
	public $_file_name = '';									//生成的文件完整路径
	public $_file_ext = '';										//文件扩展名
	public $_allow_exts = 'gif,png,jpg,jpeg';					//允许上传的类型
	public $_file_size = ''; 									//文件大小
	public $_mime_type = '';									//MIME类型
	public $_is_image = false;									//是不是图片
	public $_rand_name = true;								    //是否生成随机文件名
	public $_root_path = true;								    //网站根目录
	public $_error = '';

 	public function __construct(){
 		$this->_root_path=$_SERVER['DOCUMENT_ROOT'];
 		$this->_image_path=$this->_root_path.$this->_image_path;//图片完整目录如:D:/phpxm/upload/temp/images/
 		$this->_file_path=$this->_root_path.$this->_file_path;//文件完整目录
 		$this->_max_upload_filesize = 0.5*1024*1024; //最大上传大小0.5M;
 	}

	/**
	 * 上传文件
	 * @param string $file          上传的文件
	 * @param string $save_path     保存的路径
	 * @param string $type
	 * @return boolean
	 */
	public function uploadFile($file = ''){
		if($this->checkUpload($file)){
			//验证通过
			if($this->_is_image){
				//如果是图片
				$save_path= $this->_image_path;
			}else{
				$save_path= $this->_file_path;
			}
			$filename = $this->_rand_name?substr(md5(uniqid('file')), 0,11).'.'.$this->_file_ext:$this->_real_name;
			if(!is_dir($save_path)){
				mkdir($save_path, 0777, true);
			}
			$this->_file_name = $save_path .= $filename;
			if(self::getOS()=='Linux'){
				$mv = move_uploaded_file($this->_tmp_name, $save_path);
			}else{
				//解决windows下中文文件名乱码的问题
				$save_path = self::safeEncoding($save_path,'GB2312');
				if(!$save_path){
					//转换失败
					$this->_error = 'File Names Contains doesnt recognize Chinese';
					return false;
				}
				$mv = move_uploaded_file($this->_tmp_name,$save_path);
			}
			if(!$mv){
				$this->_error = 'Upload Failed, Can not MoveUp Tmp File.';
				return false;
			}
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 删除文件
	 * @param string $filename
	 */
	public function deleteFile($filename = ''){
		$old_filename=$filename;
		$filename=$this->_root_path.$filename;
		if(self::getOS()=='Windows'){
			//解决windows下中文文件名乱码的问题
			$filename = iconv("UTF-8", "GB2312", $filename);
		}
		if($filename && file_exists($filename) && !is_dir($filename)){
			unlink($filename);
			echo $old_filename;
		}
	}
	/**
	 * 校验上传文件是否符合要求(包括文件类型、大小)
	 * @param string $file
	 * @param string $name
	 * @param string $type
	 * @return boolean
	 */
	public function checkUpload($file = ''){
		if($file && $file['error'] == UPLOAD_ERR_OK){
			$this->_tmp_name = $file['tmp_name'];
			$this->_real_name = $file['name'];
			$this->_file_ext = $this->getExt($file['name']);
			$this->_mime_type = $file['type'];
			$this->_file_size = $file['size'];
			if(self::isImage($file['tmp_name'])){
				$this->_is_image = true;
			}

			if(!in_array($this->_file_ext, explode(',',$this->_allow_exts))){
				//校验文件类型
				$this->_error = '文件类型不正确,请重新上传！';
				return false;
			}elseif($file['size'] > $this->_max_upload_filesize){
				//文件大小超出限制
				$this->_error ='文件大小不能超过512KB！';
				return false;
			}else{
				if(!is_uploaded_file($this->_tmp_name)){
					//非法上传
					$this->_error = '非法的上传操作！';
					return false;
				}
			}

		}else{
			//尚未选择文件
			$this->_error = '请选择要上传的文件！';
			return false;
		}
		return true;
	}

	/**
	 * 取得上传文件的后缀
	 * @access private
	 * @param string $realname 文件名
	 * @return boolean
	 */
	private function getExt($realname) {
		$pathinfo = pathinfo($realname);
		return strtolower($pathinfo['extension']);
	}

	/**
	 * 取得图像信息
	 * @static
	 * @access public
	 * @param string $image 图像文件名
	 * @return mixed
	 */
	static function getImageInfo($img) {
		$imageInfo = @getimagesize($img);
		if ($imageInfo !== false) {
			$imageType = strtolower(substr(image_type_to_extension($imageInfo[2]), 1));
			$imageSize = filesize($img);
			$info = array(
					"width" => $imageInfo[0],
					"height" => $imageInfo[1],
					"type" => $imageType,
					"size" => $imageSize,
					"mime" => $imageInfo['mime']
			);
			return $info;
		} else {
			return false;
		}
	}

	/**
	 * 格式化单位
	 * @param unknown $size
	 * @param number $dec
	 * @return string
	 */
	static public function byteFormat( $size, $dec = 2 ) {
		$a = array ( "B" , "KB" , "MB" , "GB" , "TB" , "PB" );
		$pos = 0;
		while ( $size >= 1024 ) {
			$size /= 1024;
			$pos ++;
		}
		return round( $size, $dec ) . " " . $a[$pos];
	}

	/**
	 * 判断当前服务器系统
	 * @return string
	 */
	public static function getOS(){
		if(PATH_SEPARATOR == ':'){
			return 'Linux';
		}else{
			return 'Windows';
		}
	}

	/**
	 * utf-8和gb2312自动转化
	 * @param unknown $string
	 * @param string $outEncoding
	 * @return unknown|string
	 */
	public static function safeEncoding($string,$outEncoding = 'UTF-8')
	{
		$encoding = "UTF-8";
		for($i = 0; $i < strlen ( $string ); $i ++) {
			if (ord ( $string {$i} ) < 128)
				continue;

			if ((ord ( $string {$i} ) & 224) == 224) {
				// 第一个字节判断通过
				$char = $string {++ $i};
				if ((ord ( $char ) & 128) == 128) {
					// 第二个字节判断通过
					$char = $string {++ $i};
					if ((ord ( $char ) & 128) == 128) {
						$encoding = "UTF-8";
						break;
					}
				}
			}
			if ((ord ( $string {$i} ) & 192) == 192) {
				// 第一个字节判断通过
				$char = $string {++ $i};
				if ((ord ( $char ) & 128) == 128) {
					// 第二个字节判断通过
					$encoding = "GB2312";
					break;
				}
			}
		}

		if (strtoupper ( $encoding ) == strtoupper ( $outEncoding ))
			return $string;
		else
			return @iconv ( $encoding, $outEncoding, $string );
	}

	function isImage($tempFile) {
		// Get the size of the image
		$size = getimagesize($tempFile);
		if (isset($size) && $size[0] && $size[1] && $size[0] *  $size[1] > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 执行文件上传
	 */
	public function upload() {
		if (!empty($_POST)) {
			$file = new UploaderDemo();
			if(is_array($_FILES['simplefile']) && !empty($_FILES['simplefile'])){
				foreach($_FILES['simplefile'] as $value){
					if(is_array($value)){
						$files = $_FILES['simplefile'];
					}else{
						$files = array($_FILES['simplefile']);
					}
					break;
				}
			}else{
				exit(json_encode( array ( 'state' => 'error' , 'message' =>'Please select a file.')));
			}
			foreach($files as $simplefile){
				$file->uploadFile($simplefile);
				$file_path=str_replace($this->_root_path,'',$file->_file_name);
				if($file->_error){
					exit( json_encode( array ( 'error' => 1 , 'message' =>$file->_error) ) );
				}else{
					exit( json_encode( array ( 'state' => 'success', 'realFile'=>$file->_real_name, 'message' =>'上传成功', 'file' =>$file_path) ) );
				}
			}
		}
	}
}
$obj = new UploaderDemo();
if(isset($_GET['action']) && $_GET['action']=='del'){
	$file_path=isset($_POST['filePath'])?$_POST['filePath']:'';
	call_user_func(array($obj, "deleteFile"),$file_path);
}else {
	call_user_func(array($obj, "upload"));
}
