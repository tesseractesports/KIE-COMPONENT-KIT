export function getFileTypeUrl(url) {
    // Split the URL by '/' and take the last part
    const lastSegment = url.split('/').pop();
    // Split the last segment by '.' and take the last part
    const fileExtension = lastSegment.split('.').pop().toLowerCase();
    
   
    // Return the corresponding logo URL
    if (fileExtension === 'pdf') {
      //console.log('/images/pdf.png')
      return '/images/pdf.png';
    } else {
      //console.log(url)
      return url;
    }
}